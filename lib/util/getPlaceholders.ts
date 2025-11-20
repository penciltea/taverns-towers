export function getPlaceholderSite(siteType: string){
    let image = "";
    switch(siteType) {
      case "entertainment":
      case "government":
      case "guild":
      case "hidden":
      case "residence":
      case "miscellaneous":
        image = "/placeholders/sites/miscellaneous.png";
        break;
      case "temple":
        image = "/placeholders/sites/temple.png"
        break;
      case "tavern":
        image = "/placeholders/sites/tavern.png";
        break;
      case "shop":
        image = "/placeholders/sites/shop.png";
        break;
      default:
        image = "/placeholders/sites/miscellaneous.png";
        break;
    }
    return image;
  }