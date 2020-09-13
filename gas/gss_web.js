function doGet(e) {
    let action = e.parameter["action"];
    let template;
    if(!action) {
        template = "index";
    }
    else {
        switch(action) {
            case "index":
                template = "index";
                break;
            case "register":
                template = "register";
                break;
            default:
                template = "Error";
                break;
        }
    }
    // return HtmlService.createTemplateFromFile(template).evaluate();
    // return HtmlService.createHtmlOutputFromFile(template).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return HtmlService.createTemplateFromFile(template).evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}