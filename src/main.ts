import { IProduct } from "./contracts/contracts";
import { IRating } from "./contracts/contracts";
import { Category } from "./contracts/contracts";

const BASEURL = "https://fakestoreapi.com/products";
const ALLELECTRONICS = `${BASEURL}/category/electronics`;
const ALLJEWELERY = `${BASEURL}/category/jewelery`;
const ALLMENSCLOTHING = `${BASEURL}/category/men's clothing`;
const ALLWOMENSCLOTHING = `${BASEURL}/category/women's clothing`;

const searchText = document.getElementById("searchText") as HTMLInputElement;
const searchButton = document.getElementById(
  "searchButton"
) as HTMLButtonElement;
const sortierFeld = document.getElementById(
  "sortier-feld"
) as HTMLSelectElement;
const filterElectronics = document.getElementById(
  "filter_electronics"
) as HTMLButtonElement;
const filterJewelery = document.getElementById(
  "filter_jewelery"
) as HTMLButtonElement;
const filterMensClothing = document.getElementById(
  "filter_mens_clothing"
) as HTMLButtonElement;
const filterWomensClothing = document.getElementById(
  "filter_womens_clothing"
) as HTMLButtonElement;
const maincontent = document.getElementById(
  "main_content_display"
) as HTMLElement;

document.addEventListener("DOMContentLoaded", () => {
  fetchAllProducts(); //lisa
});

let allProducts: IProduct[] = [];

// Daten von API holen
function fetchAllProducts() {
  fetch(BASEURL)
    .then((response: Response) => {
      if (!response.ok) {
        throw Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((products: IProduct[]) => {
      displayProducts(products);
      allProducts = products;
    });
}

// Rendern der Produkte
function displayProducts(products: IProduct[]) {
  if (maincontent) {
    maincontent.innerHTML = "";
    const singleProductDivs = products.map((product: IProduct) => {
      const divElement = document.createElement("div");
      const imgElement = document.createElement("img");
      imgElement.src = product.image; // src statt innerhtml lisa
      divElement.appendChild(imgElement);
      const headline = document.createElement("h1");
      headline.innerHTML = product.title;
      divElement.appendChild(headline);
      // Div für Preis und AddtoCart
      const divElementInner = document.createElement("div");
      const price = document.createElement("p");
      price.innerHTML = product.price.toString(); // hier fehlt noch der Preis
      const addCart = document.createElement("button");
      addCart.innerHTML = "Add to Cart"; // damit add cart im html steht Lisa
      divElementInner.appendChild(price);
      divElementInner.appendChild(addCart);
      divElement.appendChild(divElementInner);
      return divElement;
    });
    singleProductDivs.forEach((product) => {
      maincontent.appendChild(product); //lisa
    });
  }
}

function sortProducts(event: Event): void {
  console.log("sortProducts");
  event.preventDefault();
  const sortValue = sortierFeld.value;
  switch (sortValue) {
    case "preis-aufsteigend":
      console.log("test");
      sortPriceAscending();
      break;
    case "preis-absteigend":
      sortPriceDescending();
      break;
    case "rating-aufsteigend":
      sortRatingAscending();
      break;
    case "rating-absteigend":
      sortRatingDescending();
      break;
  }
  console.log(allProducts);
  displayProducts(allProducts);
}

function sortPriceAscending() {
  allProducts.sort((a, b) => a.price - b.price);
}

function sortPriceDescending() {
  allProducts.sort((a, b) => b.price - a.price);
}

function sortRatingAscending() {
  allProducts.sort((a, b) => a.rating.rate - b.rating.rate);
}

function sortRatingDescending() {
  allProducts.sort((a, b) => b.rating.rate - a.rating.rate);
}

sortierFeld.addEventListener("change", sortProducts);

// //? const filterElectronics = document.getElementById('filter_electronics') as HTMLButtonElement;

filterElectronics?.addEventListener("click", () => {
  activateFilterByCategory(ALLELECTRONICS);
});
filterJewelery?.addEventListener("click", () => {
  activateFilterByCategory(ALLJEWELERY);
});
filterMensClothing?.addEventListener("click", () => {
  activateFilterByCategory(ALLMENSCLOTHING);
});
filterWomensClothing?.addEventListener("click", () => {
  activateFilterByCategory(ALLWOMENSCLOTHING);
});

function activateFilterByCategory(url: string) {
  fetch(url)
    .then((response: Response) => {
      if (!response.ok) {
        throw Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    // wird übergeben von Response
    .then((products: IProduct[]) => {
      // sortierter Array wird in die Render Funktion gegeben
      displayProducts(products);
    })
    .catch((error: Error) => {
      console.error(error);
    });
}
