import "./style/style.css";

document.getElementById('app').innerHTML = `
  <div class="container mx-auto px-4 py-8">
    <!-- Formulario de Producto -->
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8">
      <h2 class="text-2xl font-bold mb-4 text-center">Agregar Producto</h2>
      <form id="productForm" class="space-y-4">
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Nombre del Producto
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
            Descripción
          </label>
          <textarea 
            id="description" 
            name="description" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
            Precio
          </label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            step="0.01" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
            Imagen
          </label>
          <input 
            type="file" 
            id="image" 
            name="image" 
            accept="image/*" 
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          >
        </div>
        
        <div class="flex items-center justify-between">
          <button 
            type="submit" 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Agregar Producto
          </button>
        </div>
      </form>
    </div>

    <!-- Lista de Productos -->
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <h2 class="text-2xl font-bold mb-4 text-center">Lista de Productos</h2>
      <div id="productsList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Los productos se cargarán aquí -->
      </div>
    </div>
  </div>
`;

async function loadProducts() {
  try {
    const response = await fetch('http://localhost:3000/products');
    const result = await response.json();


    if (!response.ok) {
      throw new Error(result.message || 'Error al cargar los productos');
    }

    const productsContainer = document.getElementById('productsList');
    productsContainer.innerHTML = result.products.map(product => `
          <div class="bg-white rounded-lg shadow overflow-hidden">
          <img 
            src="${product.imageURL ? `http://localhost:3000${product.imageURL}` : 'ruta/default.jpg'}" 
            alt="${product.name || 'Producto sin nombre'}" 
            class="w-full h-48 object-cover"
          />
            <div class="p-4">
              <h3 class="text-xl font-semibold mb-2">${product.name || 'Nombre no disponible'}</h3>
              <p class="text-gray-600 mb-2">${product.description || 'Descripción no disponible'}</p>
              <p class="text-lg font-bold text-blue-600">$${isNaN(product.price) ? 'Precio no disponible' : parseFloat(product.price).toFixed(2)}</p>
            </div>
          </div>
        `).join('');
  } catch (error) {
    console.error('Error:', error);
  }
}

const form = document.getElementById('productForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al crear el producto');
    }

    alert(result.message || 'Producto agregado exitosamente');
    form.reset();
    await loadProducts();

  } catch (error) {
    console.error('Error:', error);
    alert(error.message || 'Error al agregar el producto');
  }
});

// Llama a loadProducts() al cargar la página
loadProducts();