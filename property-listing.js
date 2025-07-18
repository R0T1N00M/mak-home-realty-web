class PropertyListing {
    constructor(title, price, location, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.location = location;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    createListingElement() {
        const listingElement = document.createElement('div');
        listingElement.classList.add('property-listing');

        const imageElement = document.createElement('img');
        imageElement.src = this.imageUrl;
        imageElement.alt = this.title;

        const titleElement = document.createElement('h2');
        titleElement.textContent = this.title;

        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: $${this.price}`;

        const locationElement = document.createElement('p');
        locationElement.textContent = `Location: ${this.location}`;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = this.description;

        listingElement.appendChild(imageElement);
        listingElement.appendChild(titleElement);
        listingElement.appendChild(priceElement);
        listingElement.appendChild(locationElement);
        listingElement.appendChild(descriptionElement);

        return listingElement;
    }

    displayListing(container) {
        const listingElement = this.createListingElement();
        container.appendChild(listingElement);
    }
}

export default PropertyListing;