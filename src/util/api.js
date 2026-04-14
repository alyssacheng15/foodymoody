const apiKey =
  'L_9VwAYsriimFPwSQ-MZZclFRQ89HBtjNu6-Sd8EYAJScWMboxTcl3Zy6eSPViSUlX1sMQP-KckyfXDnElsnOjhIYkqqbIEuU8Hm3fvNvPHHird5HjVqHR9VnMNOY3Yx';

const Yelp = {
  async searchYelp(term, location = 'Santa Clarita, CA', sortBy = 'best_match', radius = 8047) {
    const params = new URLSearchParams({
      term,
      location,
      sort_by: sortBy,
      radius: Math.min(Math.round(radius), 40000), // Yelp API max is 40,000m
      limit: 20,
    });

    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?${params}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const jsonResponse = await response.json();

    if (jsonResponse.businesses) {
      return jsonResponse.businesses.map((business) => ({
        id: business.id,
        imageSrc: business.image_url,
        name: business.name,
        address: business.location.address1,
        city: business.location.city,
        state: business.location.state,
        zipCode: business.location.zip_code,
        category: business.categories[0]?.title || 'Restaurant',
        rating: business.rating,
        reviewCount: business.review_count,
        price: business.price,
        url: business.url,
        distance: business.distance,
      }));
    }

    return [];
  },
};

export default Yelp;
