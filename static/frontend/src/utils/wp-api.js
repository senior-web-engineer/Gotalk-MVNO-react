import { API_URL } from "./const";

export async function fetchPosts(page, category, search= null) {
    let url = ''
    if(category === 'All') {
      url = API_URL+`/wp/v2/posts?_embed&page=${page}&per_page=6`
    }else {
      url = API_URL+`/wp/v2/posts?_embed&page=${page}&per_page=6&categories=${category}`
    }
    if(search) {
      url = `${url}&search=${search}`
    }
    try {
      const res = await fetch(url)
      const data = await res.json();
      if(!Array.isArray(data)) {
        return []
      }else {
        return data;
      }
    }catch (e) {
      return []
    }
  }
  
  export async function fetchRelatedPosts(tags) {
    let url = API_URL+`/wp/v2/posts?_embed&order=desc&per_page=3`;
    tags.map((tag, index) => {
      url += `&tag[${index}]=${tag}`
    })
    const res = await fetch(url)
    return await res.json()
  }
  
  export async function fetchFeaturedPosts() {
    const res = await fetch(API_URL+`/wp/v2/posts?_embed&featured=true`)
    return await res.json()
  }
  
  export async function fetchCategories() {
      
    const res = await fetch(API_URL+`/wp/v2/categories`)
    return await res.json()
  }
  
