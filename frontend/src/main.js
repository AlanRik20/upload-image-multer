import "./style/style.css";

document.getElementById('app').innerHTML = `
  <div class="container mx-auto p-6">
    <!-- Formulario de Producto -->
    <div class="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-lg p-8 mb-8">
      <h2 class="text-3xl font-extrabold mb-6 text-center text-indigo-600">Agregar Producto</h2>
      <form id="productForm" class="space-y-6">
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2" for="name">
            Nombre del Producto
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            class="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          >
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2" for="description">
            Descripción
          </label>
          <textarea 
            id="description" 
            name="description" 
            class="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          ></textarea>
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2" for="price">
            Precio
          </label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            step="0.01" 
            class="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          >
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2" for="image">
            Imagen
          </label>
          <input 
            type="file" 
            id="image" 
            name="image" 
            accept="image/*" 
            class="w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-lg file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
            required
          >
        </div>

        <div class="flex justify-end">
          <button 
            type="submit" 
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            Agregar Producto
          </button>
        </div>
      </form>
    </div>

    <!-- Lista de Productos -->
    <div class="bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-extrabold mb-6 text-center text-indigo-600">Lista de Productos</h2>
      <div id="productsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Los productos se cargarán aquí -->
      </div>
    </div>
  </div>
`;

async function loadProducts() {
  try {
    const response = await fetch('http://localhost:3000/products/');
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al cargar los productos');
    }
    const productsContainer = document.getElementById('productsList');
    productsContainer.innerHTML = result.products.map(
      (product) => `
          <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img 
              src="${
                product.imageURL ? `${product.imageURL}` : null
              }" 
              alt="${product.name || 'Producto sin nombre'}" 
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-2xl font-semibold mb-2 text-gray-800">${product.name || 'Nombre no disponible'}</h3>
              <p class="text-gray-600 mb-4">${product.description || 'Descripción no disponible'}</p>
              <p class="text-xl font-bold text-indigo-600">$${isNaN(product.price) ? 'Precio no disponible' : parseFloat(product.price).toFixed(2)}</p>
            </div>
          </div>
          `
        )
        .join('');
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

loadProducts();
