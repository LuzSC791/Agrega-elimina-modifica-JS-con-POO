class Product{
    constructor(name,price,year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

// Interaccion con HTML (EVENTEOS)
class UI{
    addProduct(product){
        const productList = document.getElementById('product-list');
        // Muestra en pantalla Diseño
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="card txt-center mb-4">
            <div class="card-body">
                <strong>Product Name</strong>: ${product.name}
                <strong>Product Price</strong>: ${product.price}
                <strong>Product Year</strong>: ${product.year}
                <a href="#" class="btn btn-danger" name="delete" >Delete</a>
            </div>
        </div>
        `;
        //INSERTARLO 
        productList.appendChild(element);

        // El this es para mandar a llamar desde esta clase su metodo reset-form
        //this.resetForm();
    }

    resetForm(){
        document.getElementById('product-form').reset();
        // Tambien podemos mandarlo llamar desde fuera ya que es un elemento el cual podemos llamarlo dede ahí 
    }

    deleteProduct(element){
        if(element.name === 'delete'){
            //ELIMINAR LA TARJETA (ELEMENTO PADRE DESDE ELEMENTO HIJO) SE REALIZARA UNA ESCALA PARA LLEGAR AL PADRE
           console.log(element.parentElement.parentElement.parentElement);
           element.parentElement.parentElement.parentElement.remove();
           //Muestra mensaje de eliminado
           this.showMessage('Product Deleted Successfully', 'info');
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-3`;
        div.appendChild(document.createTextNode(message));
        // MOSTRANDO EN EL DOM (Showing in DOM)
        const container = document.querySelector('.container');
        //  SELECCIONA TODA LA APLICACIÓN
        const app = document.querySelector('#app'); 
         container.insertBefore(div, app);
         setTimeout(function(){
            document.querySelector('.alert').remove();
         }, 3000);
    }
}

// DOM Events
document
.getElementById('product-form')
.addEventListener('submit',function(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;
    const product = new Product(name, price,year);
    const ui = new UI();
    
    //Alerta de datos vacios 
    if(name ===  '' || price === '' || year === ''){
        return ui.showMessage('Complete Fields Please', 'danger');
    }

    // Save producto
    ui.addProduct(product);
    // Llamarlo desde fuera pidiendo el metodo de UI
    ui.resetForm();
    ui.showMessage("Product Added Successfully", "success");
});

document
.getElementById('product-list')
.addEventListener('click', function(e){
    //console.log(e.target);
    const ui = new UI();
    ui.deleteProduct(e.target);
});




