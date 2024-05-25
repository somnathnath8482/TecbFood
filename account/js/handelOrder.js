function myFunction() {
    alert('Button was clicked!');
}
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

function createOrder(name,number,price,address,note,items,type) {
  
    if(type=="Online"){
        createRazorpayOrder(name,number,price,address,note,items)
    }else{
        createCodOrder(name,number,price,address,note,items)
    }
}

function createRazorpayOrder(name,number,price,address,note,items) {
    var options = {
        "key": "rzp_test_5pqAawhts8XNyc", // Enter the Key ID generated from the Dashboard
        "amount": price*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "TECB food",
        "description": "Pay now",
        "image": "logo.png",
        "handler": function (response){
            alert("TRANJACTION SUCCESS TRANJACTION ID IS :"+ response.razorpay_payment_id);
           /* window.location.replace("routers/order-router.php?uid="+response.razorpay_payment_id

           +"&address=" +address
           +"&description=" +address
           +"&payment_type=Online"
           +"&total=" +price
            ); 	 */

            var form = document.createElement("form");
    
            // Set the form attributes
            form.setAttribute("method", "post");
            form.setAttribute("action", "routers/order-router.php");
            
            // Create hidden input elements and append them to the form
            var uidField = document.createElement("input");
            uidField.setAttribute("type", "hidden");
            uidField.setAttribute("name", "payment_id");
            uidField.setAttribute("value", response.razorpay_payment_id);
            form.appendChild(uidField);
            
            var addressField = document.createElement("input");
            addressField.setAttribute("type", "hidden");
            addressField.setAttribute("name", "address");
            addressField.setAttribute("value", address);
            form.appendChild(addressField);
            
            var descriptionField = document.createElement("input");
            descriptionField.setAttribute("type", "hidden");
            descriptionField.setAttribute("name", "description");
            descriptionField.setAttribute("value", note);
            form.appendChild(descriptionField);
            
            var paymentTypeField = document.createElement("input");
            paymentTypeField.setAttribute("type", "hidden");
            paymentTypeField.setAttribute("name", "payment_type");
            paymentTypeField.setAttribute("value", "Online");
            form.appendChild(paymentTypeField);
            
            var totalField = document.createElement("input");
            totalField.setAttribute("type", "hidden");
            totalField.setAttribute("name", "total");
            totalField.setAttribute("value", price);
            form.appendChild(totalField);
            
            var itemsField = document.createElement("input");
            itemsField.setAttribute("type", "hidden");
            itemsField.setAttribute("name", "items");
            itemsField.setAttribute("value", items);
            form.appendChild(itemsField);
            
            // Append the form to the document body
            document.body.appendChild(form);
            
            // Submit the form
            form.submit();



            //alert(response.razorpay_order_id);
            //alert(response.razorpay_signature)
        },
        "prefill": {
            "name": name,
            "email": "",
            "contact": number
        },
        "notes": {
            "address": address
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
    rzp1.open();
}

function createCodOrder(name,number,price,address,note,items) {
    

        var form = document.createElement("form");

        // Set the form attributes
        form.setAttribute("method", "post");
        form.setAttribute("action", "routers/order-router.php");
        
        // Create hidden input elements and append them to the form
        var uidField = document.createElement("input");
        uidField.setAttribute("type", "hidden");
        uidField.setAttribute("name", "payment_id");
        uidField.setAttribute("value", "");
        form.appendChild(uidField);
        
        var addressField = document.createElement("input");
        addressField.setAttribute("type", "hidden");
        addressField.setAttribute("name", "address");
        addressField.setAttribute("value", address);
        form.appendChild(addressField);
        
        var descriptionField = document.createElement("input");
        descriptionField.setAttribute("type", "hidden");
        descriptionField.setAttribute("name", "description");
        descriptionField.setAttribute("value", note);
        form.appendChild(descriptionField);
        
        var paymentTypeField = document.createElement("input");
        paymentTypeField.setAttribute("type", "hidden");
        paymentTypeField.setAttribute("name", "payment_type");
        paymentTypeField.setAttribute("value", "COD");
        form.appendChild(paymentTypeField);
        
        var totalField = document.createElement("input");
        totalField.setAttribute("type", "hidden");
        totalField.setAttribute("name", "total");
        totalField.setAttribute("value", price);
        form.appendChild(totalField);
        
        var itemsField = document.createElement("input");
        itemsField.setAttribute("type", "hidden");
        itemsField.setAttribute("name", "items");
        itemsField.setAttribute("value", items);
        form.appendChild(itemsField);
        
        // Append the form to the document body
        document.body.appendChild(form);
        
        // Submit the form
        form.submit();

}
