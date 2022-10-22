const apiKey = 'L_9VwAYsriimFPwSQ-MZZclFRQ89HBtjNu6-Sd8EYAJScWMboxTcl3Zy6eSPViSUlX1sMQP-KckyfXDnElsnOjhIYkqqbIEuU8Hm3fvNvPHHird5HjVqHR9VnMNOY3Yx';

const Yelp = {
    async searchYelp(term, location, sortBy) {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=santa_clarita&sort_by=review_count`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        const jsonResponse = await response.json();
        if (jsonResponse.businesses) {
            return jsonResponse.businesses.map(((business) => {
                console.log(business);
                return {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count
                };
            }));
        }
    }
};

export default Yelp;