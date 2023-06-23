const Order = require("./Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  FOOD: Symbol("food"),
  LITTER: Symbol("litter"),
  EXTRAS: Symbol("extras"),
});

module.exports = class LockDownEssentials extends Order {
  constructor(sNumber, sUrl) {
    super(sNumber, sUrl);
    this.stateCur = OrderState.WELCOMING;
    this.sSpecies = "";
    this.sFood = "";
    this.sLitter = "";
    this.sExtras = "";
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.FOOD;
        aReturn.push("Welcome to Hardware Curbside.");
        aReturn.push(`For a list of what we sell tap:`);
        aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
        if (sInput.toLowerCase() == "meow") {
          this.sSpecies = "cat";
        } else if (sInput.toLowerCase() == "woof") {
          this.sSpecies = "dog";
        } else {
          this.stateCur = OrderState.WELCOMING;
          aReturn.push(
            "Please type YO if you want to shop or NAH if you don't."
          );
          break;
        }
        aReturn.push("Would you like CANNED or DRY food or NO?");
        break;
      case OrderState.FOOD:
        if (this.sSpecies == "cat") {
          this.stateCur = OrderState.LITTER;
          aReturn.push("Would you like kitty litter?");
        } else {
          this.stateCur = OrderState.EXTRAS;
          aReturn.push("Would you like a TREAT or TOY for your dog?");
        }
        if (sInput.toLowerCase() != "no") {
          this.sFood = sInput;
        }
        break;
      case OrderState.LITTER:
        this.stateCur = OrderState.EXTRAS;
        if (sInput.toLowerCase() != "no") {
          this.sLitter = "organic kitty litter";
        }
        aReturn.push("Would you like a TREAT or TOY for your kitty?");
        break;
      case OrderState.EXTRAS:
        if (sInput.toLowerCase() != "no") {
          this.sExtras = sInput;
        }
        aReturn.push("Thank-you for your order of");
        this.nTotal = 0;
        if (this.sSpecies == "cat" && this.sFood.toLowerCase() == "canned") {
          aReturn.push("canned cat food");
          this.nTotal += 5.99;
        } else if (this.sSpecies == "cat" && this.sFood.toLowerCase == "dry") {
          aReturn.push("dry cat food");
          this.nTotal += 2.99;
        } else if (
          this.sSpecies == "dog" &&
          this.sFood.toLowerCase() == "canned"
        ) {
          aReturn.push("canned dog food");
          this.nTotal += 5.99;
        } else if (this.sSpecies == "dog" && this.sFood.toLowerCase == "dry") {
          aReturn.push("dry dog food");
          this.nTotal += 5.99;
        }
        if (this.sLitter) {
          aReturn.push(this.sLitter);
          this.nTotal += 2.99;
        }
        if (this.sExtras) {
          aReturn.push(this.sExtras);
          this.nTotal += 2.99;
        }
        aReturn.push(`Your total comes to ${this.nTotal}`);
        aReturn.push(
          `We will text you from 519-222-2222 when your order is ready or if we have questions.`
        );
        this.isDone(true);
        break;
    }
    return aReturn;
  }
  renderForm() {
    // your client id should be kept private
    return `
      <html>
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type" />
    <style type="text/css">
      ol {
        margin: 0;
        padding: 0;
      }
      table td,
      table th {
        padding: 0;
      }
      .c5 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 301.5pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c0 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 148.5pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c1 {
        color: #1155cc;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 14.5pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c3 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
        height: 11pt;
      }
      .c11 {
        color: #202122;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 14.5pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c12 {
        color: #1155cc;
        font-weight: 700;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 14.5pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c17 {
        color: #b45f06;
        font-weight: 700;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 18pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c8 {
        color: #1155cc;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 11pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c4 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 11pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c16 {
        color: #38761d;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 11pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c6 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .c10 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1;
        text-align: left;
        height: 11pt;
      }
      .c7 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1;
        text-align: right;
      }
      .c15 {
        border-spacing: 0;
        border-collapse: collapse;
        margin-right: auto;
      }
      .c20 {
        background-color: #ffffff;
        max-width: 451.4pt;
        padding: 72pt 72pt 72pt 72pt;
      }
      .c19 {
        color: #b45f06;
        font-size: 17pt;
      }
      .c9 {
        color: #b45f06;
        font-size: 12pt;
      }
      .c18 {
        color: #38761d;
        font-size: 13pt;
      }
      .c14 {
        color: #38761d;
        font-size: 14.5pt;
      }
      .c13 {
        color: #1155cc;
        font-size: 14.5pt;
      }
      .c2 {
        height: 0pt;
      }
      .title {
        padding-top: 0pt;
        color: #000000;
        font-size: 26pt;
        padding-bottom: 3pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .subtitle {
        padding-top: 0pt;
        color: #666666;
        font-size: 15pt;
        padding-bottom: 16pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      li {
        color: #000000;
        font-size: 11pt;
        font-family: "Arial";
      }
      p {
        margin: 0;
        color: #000000;
        font-size: 11pt;
        font-family: "Arial";
      }
      h1 {
        padding-top: 20pt;
        color: #000000;
        font-size: 20pt;
        padding-bottom: 6pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h2 {
        padding-top: 18pt;
        color: #000000;
        font-size: 16pt;
        padding-bottom: 6pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h3 {
        padding-top: 16pt;
        color: #434343;
        font-size: 14pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h4 {
        padding-top: 14pt;
        color: #666666;
        font-size: 12pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h5 {
        padding-top: 12pt;
        color: #666666;
        font-size: 11pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h6 {
        padding-top: 12pt;
        color: #666666;
        font-size: 11pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        font-style: italic;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
    </style>
  </head>
  <body class="c20 doc-content">
    <p class="c6">
      <span class="c19">Welcome to</span><span class="c9">&nbsp;</span
      ><span class="c17">Hardware @Curbside</span>
    </p>
    <p class="c3"><span class="c4"></span></p>
    <p class="c3"><span class="c4"></span></p>
    <p class="c6">
      <span class="c18">We offer </span
      ><span class="c14">home maintenance essentials</span
      ><span class="c16">:</span>
    </p>
    <p class="c3"><span class="c11"></span></p>
    <p class="c3"><span class="c11"></span></p>
    <a id="t.5414227f729eea421fafff03ed6e787046252872"></a><a id="t.0"></a>
    <table class="c15">
      <tr class="c2">
        <td class="c5" colspan="1" rowspan="1">
          <p class="c6"><span class="c1">snow shovels</span></p>
        </td>
        <td class="c0" colspan="1" rowspan="1">
          <p class="c7"><span class="c12">$15</span></p>
        </td>
      </tr>
      <tr class="c2">
        <td class="c5" colspan="1" rowspan="1">
          <p class="c6">
            <span class="c1">garbage and recycling containers</span>
          </p>
          <p class="c10"><span class="c1"></span></p>
        </td>
        <td class="c0" colspan="1" rowspan="1">
          <p class="c7"><span class="c12">$9</span></p>
        </td>
      </tr>
      <tr class="c2">
        <td class="c5" colspan="1" rowspan="1">
          <p class="c6"><span class="c1">light-bulbs</span></p>
          <p class="c10"><span class="c1"></span></p>
        </td>
        <td class="c0" colspan="1" rowspan="1">
          <p class="c7"><span class="c12">$20</span></p>
        </td>
      </tr>
      <tr class="c2">
        <td class="c5" colspan="1" rowspan="1">
          <p class="c6"><span class="c13">household cleaners</span></p>
          <p class="c10"><span class="c1"></span></p>
        </td>
        <td class="c0" colspan="1" rowspan="1">
          <p class="c7"><span class="c12">$12</span></p>
        </td>
      </tr>
    </table>
    <p class="c3"><span class="c11"></span></p>
    <p class="c3"><span class="c4"></span></p>
  </body>
</html>
      `;
  }
};
