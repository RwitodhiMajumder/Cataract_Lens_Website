document.getElementById('cataractForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('imageUpload');
    const resultText = document.getElementById('resultText');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        // Placeholder for actual detection logic
        resultText.innerHTML = `Cataract detection in progress for ${file.name}...`;
        setTimeout(() => {
            resultText.innerHTML = `No cataracts detected in ${file.name}.`;
        }, 2000);
    } else {
        resultText.innerHTML = 'Please upload an image first.';
    }
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart items
function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    let total = 0;

    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Price: ₹${item.price}</p>
                    <p class="card-text">Quantity: ${item.quantity}</p>
                    <p class="card-text">Total: ₹${itemTotal}</p>
                    <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    totalPrice.textContent = total;
    document.getElementById('cartCount').textContent = cart.length;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Function to proceed to payment
function proceedToPayment() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to proceed.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart items
function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    let total = 0;

    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Price: ₹${item.price}</p>
                    <p class="card-text">Quantity: ${item.quantity}</p>
                    <p class="card-text">Total: ₹${itemTotal}</p>
                    <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    totalPrice.textContent = total;
    document.getElementById('cartCount').textContent = cart.length;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Function to proceed to payment
function proceedToPayment() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to proceed.");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const options = {
        key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
        amount: total * 100, // Amount in paise
        currency: "INR",
        name: "Cataract Detection",
        description: "Payment for Lenses",
        handler: function (response) {
            alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
        },
        prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999",
        },
        theme: {
            color: "#3399cc",
        },
    };

    const rzp = new Razorpay(options);
    rzp.open();
}

// Function to retry payment
function retryPayment() {
    // Close the failure modal
    const failureModal = bootstrap.Modal.getInstance(document.getElementById('paymentFailureModal'));
    failureModal.hide();

    // Open the payment options modal
    new bootstrap.Modal(document.getElementById('paymentModal')).show();
}

// Display cart items on page load
displayCartItems();
}