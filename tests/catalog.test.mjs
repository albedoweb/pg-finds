import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {selectResources, latestMention, mentionYears, initialCategory} from '../lib/catalog-data.ts';
const items=JSON.parse(readFileSync(new URL('../content/catalog.json',import.meta.url)));
const base={query:'',category:'All topics',format:'All formats',savedOnly:false,saved:[],sort:'Selected order',year:'All years'};
test('search, topic, format and saved filters intersect without mutating source',()=>{
 const before=JSON.stringify(items);const sample=items[0];
 assert(selectResources(items,{...base,query:sample.title,category:sample.category,format:sample.type,savedOnly:true,saved:[sample.id]}).some(x=>x.id===sample.id));
 assert.equal(selectResources(items,{...base,query:'no-such-postgres-finds-resource'}).length,0);
 assert.equal(selectResources(items,{...base,savedOnly:true,saved:[]}).length,0);
 assert.equal(JSON.stringify(items),before);
});
test('multi-year discovery filters match every mention and sort semantics are distinct',()=>{
 const a={...items[0],id:'a',firstSeen:'2023-01-01',hnLinks:[{date:'2023-01-01'},{date:'2026-04-01'}]};
 const b={...items[0],id:'b',firstSeen:'2025-01-01',hnLinks:[{date:'2025-01-01'}]};
 const source=[a,b];assert.deepEqual(mentionYears(a),['2023','2026']);assert.equal(latestMention(a),'2026-04-01');
 assert.deepEqual(selectResources(source,{...base,year:'2023'}).map(x=>x.id),['a']);
 assert.deepEqual(selectResources(source,{...base,year:'2026'}).map(x=>x.id),['a']);
 assert.deepEqual(selectResources(source,{...base,year:'2025'}).map(x=>x.id),['b']);
 assert.deepEqual(selectResources(source,{...base,sort:'Selected order'}).map(x=>x.id),['a','b']);
 assert.deepEqual(selectResources(source,{...base,sort:'Newest discovery'}).map(x=>x.id),['b','a']);
 assert.deepEqual(selectResources(source,{...base,sort:'Newest HN mention'}).map(x=>x.id),['a','b']);
 assert.deepEqual(source.map(x=>x.id),['a','b']);
});
test('public dataset has provenance, English copy and no private artifacts',()=>{
 assert(items.length>0);assert.equal(new Set(items.map(x=>x.id)).size,items.length);
 for(const item of items){assert.match(item.id,/^[a-f0-9]{24}$/);assert(!/[\u0400-\u04ff]/.test(JSON.stringify(item)));assert(item.summary&&item.why&&item.title);assert(item.hnLinks.length>0);const url=new URL(item.url);assert(['http:','https:'].includes(url.protocol));assert(!['localhost','127.0.0.1'].includes(url.hostname));assert.match(item.checkedAt,/^\d{4}-\d{2}-\d{2}$/);for(const h of item.hnLinks){assert.equal(h.url,`https://news.ycombinator.com/item?id=${h.id}`);assert.match(h.date,/^20\d{2}-\d{2}-\d{2}/);}if(item.dateConflict)assert.equal(item.datePublished,null);}
 assert(!/\/Users\/|text_path|content_hash|article_text|api_key/.test(JSON.stringify(items)));
});

test('initial category accepts only a single known topic',()=>{
 const category=items.find(item=>item.category.includes('&')).category;
 assert.equal(initialCategory(items,new URLSearchParams(`category=${encodeURIComponent(category)}`).get('category')),category);
 assert.equal(initialCategory(items,'Unknown topic'),'All topics');
 assert.equal(initialCategory(items,[category,category]),'All topics');
 assert.equal(initialCategory(items,undefined),'All topics');
});
