const Order = require("./Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  MENU: Symbol("menu"),
  AMOUNT: Symbol("amount"),
  EXTRAS: Symbol("extras"),
  SMENU: Symbol("secondmenu"),
});
const price = {
  1: 15,
  2: 9,
  3: 20,
  4: 12,
  extra: 2.99,
};
module.exports = class LockDownEssentials extends Order {
  constructor(sNumber, sUrl) {
    super(sNumber, sUrl);
    this.stateCur = OrderState.WELCOMING;
    this.sAmount = [];
    this.sItem = [];
    this.sTotal = 0;
    this.sExtras = "";
    this.itemCount = 0;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.MENU;
        aReturn.push("Welcome to Hardware Curbside.");
        aReturn.push(`For a list of what we sell tap:`);
        aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
        aReturn.push(
          "We offer \n1. Snow shovels\n2. Garbage containers\n3. Light-bulbs\n4. Household cleaners\nEnter the item number you want to buy."
        );
        break;
      case OrderState.MENU:
        if (sInput != "1" && sInput != "2" && sInput != "3" && sInput != "4") {
          aReturn.push("Please enter a correct item number.");
        } else {
          this.stateCur = OrderState.AMOUNT;
          this.sItem.push(sInput);
          aReturn.push("Enter the amount of this item (1-5)");
        }
        break;
      case OrderState.SMENU:
        if (sInput >= 1 && sInput <= 4) {
          this.sItem.push(sInput);
          this.stateCur = OrderState.AMOUNT;
          aReturn.push("Enter the amount of this item (1-5)");
        } else if (sInput.toLowerCase() == "no") {
          this.stateCur = OrderState.EXTRAS;
          aReturn.push("Would you like a ear-bud?");
        } else {
          aReturn.push("Please enter a correct item number or no to checkout");
        }
        break;
      case OrderState.AMOUNT:
        if (sInput < 1 || sInput > 5) {
          aReturn.push("Please enter a correct amount.");
        } else {
          this.sAmount.push(sInput);

          if (this.itemCount < 3) {
            aReturn.push(
              "Would you like another item?\n1. Snow shovels\n2. Garbage containers\n3. Light-bulbs\n4. Household cleaners\nOr enter no to checkout"
            );
            this.stateCur = OrderState.SMENU;
            this.itemCount++;
          } else {
            this.stateCur = OrderState.EXTRAS;
            aReturn.push("Would you like a ear-bud?");
          }
        }
        break;
      case OrderState.EXTRAS:
        if (sInput.toLowerCase() != "no") {
          this.sExtras = sInput;
        }
        aReturn.push("Thank-you for your order of");
        for (let i = 0; i < this.sItem.length; i++) {
          let itemNum = parseInt(this.sItem[i]);
          let amount = parseInt(this.sAmount[i]);
          switch (itemNum) {
            case 1:
              aReturn.push(`${amount} Snow shovels`);
              break;
            case 2:
              aReturn.push(`${amount} Garbage containers`);
              break;
            case 3:
              aReturn.push(`${amount} Ligh-bulbs`);
              break;
            case 4:
              aReturn.push(`${amount} Household cleaners`);
              break;
            default:
              break;
          }
          this.sTotal += price[itemNum] * amount;
        }

        if (this.sExtras) {
          aReturn.push(this.sExtras);
          this.sTotal += 2.99;
        }
        aReturn.push(`Your total comes to $${this.sTotal}`);
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
