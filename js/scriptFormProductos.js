document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-add-product');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); //Detiene la acción normal del botón

        // Traer la información del formulario
        const name = document.getElementById('product-name').value.trim();
        const price = document.getElementById('product-price').value.trim();
        const description = document.getElementById('product-description').value.trim();
        const imageFile = document.getElementById('product-image').files[0];
        const category = document.getElementById('product-category').value.trim();
        const subcategory = document.getElementById('product-subCategory').value.trim();

        //Revisar que todos los campos se llenaron
        if (!name || !price || !description || !category || !subcategory || !imageFile) {
            return alert("Todos los campos son obligatorios");
        }

        //Revisar que el precio ingresado sea un número
        if (isNaN(price) || parseFloat(price) <= 0) {
            return alert("El precio debe ser un número válido mayor a 0");
        }

        //Leer la imagen
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageBase64 = e.target.result;

            // Crear JSON del producto
            const product = {
                name: name,
                image: imageBase64,
                description: description,
                price: parseFloat(price),
                category: category,
                subcategory: subcategory
            };

            // Guardar el producto en el local storage
            saveProductToLocalStorage(product);

            form.reset();
        };

        reader.readAsDataURL(imageFile);
    });

    // Función para guardar el producto en el JSON products del local storage
    function saveProductToLocalStorage(product) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        window.location.href = '../html/productos.html';
        alert("Producto agregado exitosamente");
    }
});
