export function setDYContext({type, data}) {
    window.DY = window.DY || {};
    window.DY.recommendationContext = { type: type, data: data };
  }

export function getPageName(page) {
    switch(page) {
        case "/" : return {type: "HOMEPAGE"};
        case "/shop" : return {type: "PRODUCT", data: ["SKU1","SKU2"]};
        case "/checkout" : return {type: "CHECKOUT", data: ["SKU1"]};
        default : return {type: "HOMEPAGE"}
    }
}