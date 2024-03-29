export const config = {
	headers: {
		Authorization: "Basic c3ByaW5nLXNlY3VyaXR5LW9hdXRoMi1yZWFkLXdyaXRlLWNsaWVudDpzcHJpbmctc2VjdXJpdHktb2F1dGgyLXJlYWQtd3JpdGUtY2xpZW50LXBhc3N3b3JkMTIzNA==",
	}
};

export const formData = {
	client_id: 'spring-security-oauth2-read-write-client',
	grant_type: 'password'
}; 

export const localisation = { 
	"locale": "en-GB",
	"currency": "HKD"
}

export const productParams = {
	...localisation, 
	"category": "PRM04",
	"page": "0",
	"size": "10",
	"sort": "nameAsc"
}

export const searchParams = {
	...localisation, 
	"q": ""
}

export const BROWSE_TYPE = "browse"
export const SEARCH_TYPE = "search"
export const PRICE_FACET = 'price'
export const TAG_FACET = 'tag'
export const CATEGORY_FACET = 'category'
export const BRAND_FACET = 'brand'
