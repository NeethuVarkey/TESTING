/*
 * Positive Scenario : Creating a cart and adding two items into the cart and finding that the total amount is correct
 * Assuming that there will be only one store and one cart associated with it for the given API
 */

const assert = require("chai").expect;
const should = require("should");
const request = require("request");
var baseURL = "https://dev-commerce.yum-poc.com/v1/";

//const BEARER_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjExMDIwYTczIn0.eyJjdXN0b21lcl9pZCI6ImY4OTlkMjAwLTIzOTMtNDA4Zi1iMDdjLWRjNjQ3ZDMyZWUyOCIsInNjb3BlIjoiZnVsbF9zY29wZSIsImlhdCI6MTU2OTI2MzI0MSwiYXVkIjoidGVzdF9hdWRpZW5jZSIsImlzcyI6ImFwaWdlZSJ9.YvtZ6waTHKArXic9YOhpP0cMV-lWvBIFo0sv-2C9YkGFk7WHZJweANYn35fKa0X9imIxgNUPKLpSOZbrWLYpCP3-KUxNPfZAXbVk7LTvpQT0wtQJON5q5uYFw284oKF482fgz8okoSj4sWPiH3fWu_tuwoHx_ZqAJzhAOkUy8gDHHBNLzeJbFUCTi90XuT_cLDo7Hsrhn_txQf3C4T5o2hNrXFTIuMbrvv05namiyWbvP50eZ9Ts1Xs5yXTC8CygsuCJJnk6nqL03Tn5cHksb2hjJPP22ZvCcbEV50auv60M9VKBOONzzLMbGKLNzUkIbWmF82twAD0gg77aTzp2Iw";

async describe("CartFunction", function(){

  it("check cart price for 2 products", function(){
    this.timeout(10000);


    const menu = await request.get({url:baseURL+'stores/KFC0001/menu'},
    		function(error,response,body){
    		var bodyObj = JSON.parse(body);    	
    		assert(response.statusCode).to.equal(200);
    		assert(bodyObj.store.store_number).to.equal("KFC0001");
//    		console.log(body);
    		});
    const createCartOptions = {
    	    url:baseURL+'/cart',
    	    method: 'POST',
    	    headers: {
    	        'Content-Type': 'application/json'
    	    },
    	    body: JSON.stringify({
    		    "store_number": "KFC0001",
    		    "occasion_id": "DRIVE_THRU",
    		    "delivery_address": null
    		  })
    	};
	const createCart =await request(createCartOptions,
			function(error,response,body){
				var bodyObj = JSON.parse(body);    	
				console.log(body);
				assert(response.statusCode).to.equal(200);
				assert(bodyObj.cart_id).to.be.a('string');
				});	
	 const addProduct1Options = {
	    	    url:baseURL+'/cart/products',
	    	    method: 'POST',
	    	    headers: {
	    	        'Content-Type': 'application/json'
	    	    },
	    	    body: JSON.stringify({
	    	    	"product_id": "11",
	    	        "class_id": "1",
	    	        "size_id": "5",
	    	        "base_id": "1",
	    	         quantity: 1
	    		  })
	    	};
	const addProduct1 = await request(addProduct1Options,
			function(error,response,body){
				var bodyObj = JSON.parse(body);    	
				console.log(body);
				assert(response.statusCode).to.equal(200);
				});	
	 const addProduct2Options = {
	    	    url:baseURL+'/cart/products',
	    	    method: 'POST',
	    	    headers: {
	    	        'Content-Type': 'application/json'
	    	    },
	    	    body: JSON.stringify({
	    	    	"product_id": "13",
	    	        "class_id": "1",
	    	        "size_id": "3",
	    	        "base_id": "1",
	    	         quantity: 1
	    		  })
	    	};
	const addProduct2 = await request(addProduct2Options,
			function(error,response,body){
				var bodyObj = JSON.parse(body);    	
				console.log(body);
				assert(response.statusCode).to.equal(200);
				});	
		assert(addProduct2.total).to.equal(608);
		
	   });
	});
			


