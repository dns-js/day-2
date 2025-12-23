//promise
//fetch('https://dummyjson.com/products')
//.then ((response) => response.json())
//.then((result) => console.log(result));

//async await

const getProoduct1 = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const result = await response.json();
    console.log("async await 1", result);
};

const getProoduct2 = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const result = await response.json();
    console.log("async await 2", result);
};

const getProoduct3 = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const result = await response.json();
    console.log("async await 3", result);
};

const getAllProduct = async () => {
    const result = await Promise.all([
        getProduct1(),
        getProduct2(),
        getProduct3(),
    ]);
    console.log("result", result);
}
getAllProduct();