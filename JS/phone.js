const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);

}

const displayPhones = phones => {
    // console.log(phones);

    // step1 >> get the mother container.
    const phoneContainer = document.getElementById('phone-container');
    // clear phone card container before adding new phone
    phoneContainer.textContent='';

    phones.forEach(phone => {
        console.log(phone);
        // step2 >> create a child div(can add class).
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-gray-100`;
        // step3 >> set inner html in the child.
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="phone" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.brand}</h2>
          <p>${phone.phone_name}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
        `;
        // step4 >> appene the child to mother container.
        phoneContainer.appendChild(phoneCard);
    })
}

// handle search btn
const handelSearch = search=>{
    console.log('search here');
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    loadPhone(searchText);
}

