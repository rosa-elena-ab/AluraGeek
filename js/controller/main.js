import { servicesProducts } from "../service/productoService.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name,price,image, id){
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
                 <div class="img-container">
                    <img src="${image}" alt="${name}">
                </div>
                <div class="card-container--info">
                    <p class="informacion_producto">${name}</p>
                    <div class="card-container--value">
                        <p class="informacion_producto">${price}</p>
                        <button class="delete-button" data-id="${id}">
                            <img src="./images/Vector.svg" alt="Eliminar">

                        </button>
                    </div>
                </div>

    `;

     //Código para eliminar un cuadro desde el botón "papelera"
     const eliminar =card.querySelector(".delete-button");
     eliminar.addEventListener("click", () => {
        servicesProducts.deleteProduct(id)
         .then(() => {
             card.remove();
         })
         .catch(err => console.log(err));
     });

    productContainer.appendChild(card);
    return card;
}

const render = async() =>{
    try {
        const listProducts = await servicesProducts.productList();
        console.log(listProducts);

        listProducts.forEach(product =>{
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )
        });
        
    } catch (error) {
        console.log(error);
    }

};

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    console.log(name);
    console.log(price);
    console.log(image);

    servicesProducts.createProduct(name,price,image)
        .then((res)=> console.log(res))
        .catch((error)=>console.log(error));

});

form.addEventListener("reset", () =>{
    const name = document.querySelector("[data-name]");
    const price = document.querySelector("[data-price]");
    const image = document.querySelector("[data-image]");

    name.innerHTML="";
    price.innerHTML="";
    image.innerHTML="";
});

render();