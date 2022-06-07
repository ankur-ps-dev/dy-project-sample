export function setDYContext({type, data}) {
    window.DY = window.DY || {};
    window.DY.recommendationContext = { type: type, data: data };
  }

  export function setDYConcent(type) {
    window.DY = window.DY || {API: () => console.log("API Not Found")};
    switch(type){
        case "OPTIN": return  window.DY.API('consent_optin')
        default : return  window.DY.API('consent_optout')
    }
  }
  export function updateDYConcent(status) {
    window.DY = window.DY || {API: () => console.log("API Not Found")};
    window.DY.API('consent_status_update', { status });
  }

export function getPageName(page) {
    switch(page) {
        case "/" : return {type: "HOMEPAGE"};
        case "/shop" : return {type: "PRODUCT", data: ["SKU1","SKU2"]};
        case "/checkout" : return {type: "CHECKOUT", data: ["SKU1"]};
        default : return {type: "HOMEPAGE"}
    }
}