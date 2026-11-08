export type Item = {id:string,title:string,summary:string,why:string,category:string,type:string,url:string,hnLinks:{id:number,url:string,title:string,date:string}[],firstSeen:string,datePublished:string|null,reportedDate:string|null,dateConflict:boolean,checkedAt:string,featured:boolean,readingHint?:string,currentStatus?:{text:string,checkedAt:string,sources:string[]}};

export type Selection = {query:string; category:string; format:string; savedOnly:boolean; saved:string[]; sort:string; year?:string};
export function selectResources(items:Item[], options:Selection):Item[]{
 const {query,category,format,savedOnly,saved,sort,year}=options;
 const q=query.toLowerCase().trim();
 const list=items.filter(x=>(category==='All topics'||x.category===category)&&(format==='All formats'||x.type===format)&&(!savedOnly||saved.includes(x.id))&&(!year||year==='All years'||x.hnLinks.some(h=>h.date.slice(0,4)===year))&&(!q||`${x.title} ${x.summary} ${x.category} ${new URL(x.url).hostname}`.toLowerCase().includes(q)));
 if(sort==='A–Z')return list.sort((a,b)=>a.title.localeCompare(b.title));
 if(sort==='Newest HN mention')return list.sort((a,b)=>latestMention(b).localeCompare(latestMention(a)));
 if(sort==='Newest discovery')return list.sort((a,b)=>b.firstSeen.localeCompare(a.firstSeen));
 return list; 
}

export function latestMention(item:Item):string { return item.hnLinks.reduce((latest, h)=>h.date>latest?h.date:latest, ''); }
export function mentionYears(item:Item):string[] { return [...new Set(item.hnLinks.map(h=>h.date.slice(0,4)))].sort(); }

export function initialCategory(items: {category:string}[], value: string|string[]|undefined): string {
 return typeof value === 'string' && items.some(item => item.category === value) ? value : 'All topics';
}
