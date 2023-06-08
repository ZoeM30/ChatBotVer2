const Order = require("./Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  MENU: Symbol("menu"),
  SIZE: Symbol("size"),
  TOPPINGS: Symbol("toppings"),
  SPRINGROLLS: Symbol("springrolls"),
  DRINKS: Symbol("drinks"),
  SECONDITEM: Symbol("secondItem"),
  SECONDSIZE: Symbol("secondSize"),
  SECONDTOPPING: Symbol("secondTopping"),
  PAYMENT: Symbol("payment"),
});
const price = {
  pho: { small: 12, medium: 14, large: 18 },
  rice: { small: 10, medium: 12, large: 16 },
  soup: { small: 8, medium: 10, large: 13 },
  toppings: 5,
  springroll: { vegetable: 5, shrimp: 7, tofu: 5 },
  drinks: 3,
};
module.exports = class ShwarmaOrder extends Order {
  constructor(sNumber, sUrl) {
    super(sNumber, sUrl);
    this.stateCur = OrderState.WELCOMING;
    this.sSize = "";
    this.sToppings = "";
    this.sDrinks = "";
    this.sItem = "";
    this.springroll = "";
    this.sSecondItem = "";
    this.sSecondSize = "";
    this.sSecondTopping = "";
    this.total = 0;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.MENU;
        aReturn.push("Welcome to Pho Vietnam KW");
        aReturn.push("What would you like? Pho, Rice, Soup?");
        break;
      case OrderState.MENU:
        if (["pho", "rice", "soup"].includes(sInput.toLowerCase())) {
          this.stateCur = OrderState.SIZE;
          this.sItem = sInput;
          aReturn.push("What size would you like?Small, medium, large?");
        } else {
          aReturn.push("Please enter a valid item: Pho, Rice, Soup.");
        }
        break;
      case OrderState.SIZE:
        if (["small", "medium", "large"].includes(sInput.toLowerCase())) {
          this.stateCur = OrderState.TOPPINGS;
          this.sSize = sInput;
          this.total += price[this.sItem][this.sSize];
          aReturn.push("What toppings would you like?Beef, Chicken, Shrimp?");
        } else {
          aReturn.push("Please enter a valid size: small, medium, or large.");
        }
        break;
      case OrderState.TOPPINGS:
        if (["beef", "chicken", "shrimp"].includes(sInput.toLowerCase())) {
          this.stateCur = OrderState.SECONDITEM;
          this.sToppings = sInput;
          this.total += price.toppings;
          aReturn.push(
            "Would you like another item?Pho, Rice, Soup? Or type no to finish order."
          );
        } else {
          aReturn.push(
            "Please enter a valid topping: beef, chicken, or shrimp."
          );
        }
        break;
      case OrderState.SECONDITEM:
        if (sInput.toLowerCase() != "no") {
          if (["pho", "rice", "soup"].includes(sInput.toLowerCase())) {
            this.sSecondItem = sInput;
            this.stateCur = OrderState.SECONDSIZE;
            aReturn.push("What size would you like?Small, medium, large?");
          } else {
            aReturn.push("Please enter a valid item: Pho, Rice, Soup.");
          }
        } else {
          this.stateCur = OrderState.SPRINGROLLS;
          aReturn.push(
            "Would you like a spring roll with your order?Vegetable, shrimp, tofu?Or type no to finish order."
          );
        }
        break;
      case OrderState.SECONDSIZE:
        if (["small", "medium", "large"].includes(sInput.toLowerCase())) {
          this.stateCur = OrderState.SECONDTOPPING;
          this.sSecondSize = sInput;
          this.total += price[this.sSecondItem][this.sSecondSize];
          aReturn.push("What toppings would you like?Beef, Chicken, Shrimp?");
        } else {
          aReturn.push("Please enter a valid size: small, medium, or large.");
        }
        break;
      case OrderState.SECONDTOPPING:
        if (["beef", "chicken", "shrimp"].includes(sInput.toLowerCase())) {
          this.stateCur = OrderState.SPRINGROLLS;
          this.sSecondTopping = sInput;
          this.total += price.toppings;
          aReturn.push(
            "Would you like a spring roll with your order?Vegetable, shrimp, tofu?Or type no to finish order."
          );
        } else {
          aReturn.push(
            "Please enter a valid topping: beef, chicken, or shrimp."
          );
        }
        break;
      case OrderState.SPRINGROLLS:
        if (sInput.toLowerCase() == "no") {
          this.stateCur = OrderState.DRINKS;
          aReturn.push(
            "Would you like a drink with your order? Milkshake, Vietnam Coffee or Coconut Juice? Or type no to finish order."
          );
        } else if (
          ["vegetable", "shrimp", "tofu"].includes(sInput.toLowerCase())
        ) {
          this.stateCur = OrderState.DRINKS;
          this.springroll = sInput;
          this.total += price.springroll[sInput];
          aReturn.push(
            "Would you like a drink with your order? Coke, Juice or Coffee? Or type no to finish order."
          );
        } else {
          this.stateCur = OrderState.SPRINGROLLS;
          aReturn.push(
            "Please enter a valid spring roll option: vegetable, shrimp, or tofu."
          );
        }

        break;
      case OrderState.DRINKS:
        this.stateCur = OrderState.PAYMENT;

        if (sInput.toLowerCase() != "no") {
          this.sDrinks = sInput;
          this.total += price.drinks;
        }
        aReturn.push("Thank-you for your order of");
        aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
        if (this.sSecondItem) {
          aReturn.push(
            `${this.sSecondSize} ${this.sSecondItem} with ${this.sSecondTopping}`
          );
        }
        if (this.springroll) {
          aReturn.push(`${this.springroll} spring roll`);
        }
        if (this.sDrinks) {
          aReturn.push(this.sDrinks);
        }
        const tax = this.total * 0.13;
        this.finalPrice = (this.total + tax).toFixed(2);
        aReturn.push(
          `Subtotal: $${this.total}\nHST: $${tax}\nTotal: $${this.finalPrice}`
        );
        aReturn.push(`Please pay for your order here`);
        aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
        break;
      case OrderState.PAYMENT:
        console.log(sInput.purchase_units[0].shipping);
        let addressLine = `${sInput.purchase_units[0].shipping.address.address_line_1}\n${sInput.purchase_units[0].shipping.address.admin_area_2}\n${sInput.purchase_units[0].shipping.address.admin_area_1}\n${sInput.purchase_units[0].shipping.address.postal_code}`;
        this.isDone(true);
        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Your order will be delivered at ${d.toTimeString()}`);
        aReturn.push(`Order deliver to: ${addressLine}\n`);
        break;
    }
    return aReturn;
  }
  renderForm(sTitle = "-1", sAmount = "-1") {
    // your client id should be kept private
    if (sTitle != "-1") {
      this.sItem = sTitle;
    }
    if (sAmount != "-1") {
      this.nOrder = sAmount;
    }
    const sClientID = process.env.SB_CLIENT_ID;
    //;
    return `
      <!DOCTYPE html>
  
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
      </head>
      
      <body>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script
          src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
        </script>
        Thank you ${this.sNumber} for your order of $${this.finalPrice}.
        <div id="paypal-button-container"></div>
  
        <script>
          paypal.Buttons({
              createOrder: function(data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '${this.finalPrice}'
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                  // This function shows a transaction success message to your buyer.
                  $.post(".", details, ()=>{
                    window.open("", "_self");
                    window.close(); 
                  });
                });
              }
          
            }).render('#paypal-button-container');
          // This function displays Smart Payment Buttons on your web page.
        </script>
      
      </body>
          
      `;
  }
};
