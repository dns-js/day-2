fetch('https://dummyjson.com/products/1')
    .then((response) => response.json())
    // .then((result) => console.log(result));

const getProduct = async () => {
    const response = await fetch('https://dummyjson.com/products/1');
    const result = await response.json();
    console.log(result);
};

getProduct();