const loadPhone = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones);

}

const displayPhones = phones => {
  // console.log(phones);

  // sowh all btn when card length more than 12
  const showAllContainer = document.getElementById('showAll-container')
  if (phones.length > 12) {
    console.log(phones.length);
    showAllContainer.classList.remove('hidden');
  }
  else {
    showAllContainer.classList.add('hidden');
  }

  // display (limited) first 12 phone cards
  phones = phones.slice(0, 12);

  // step1 >> get the mother container.
  const phoneContainer = document.getElementById('phone-container');
  // clear phone card container before adding new phone
  phoneContainer.textContent = '';

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
  // hide loading spinner 
  toggleLoadingSpin(false);
}

// handle search btn
const handleSearch = () => {
  // console.log('search here');
  toggleLoadingSpin(true);//call loading-spinner
  const inputField = document.getElementById('input-field');
  const searchText = inputField.value;
  loadPhone(searchText);
}

// another handle search btn >> recap
const handleSearch2 = () => {
  toggleLoadingSpin(true);//call loading-spinner
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText);
}

// loading spinner
const toggleLoadingSpin = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  }
  else {
    loadingSpinner.classList.add('hidden');
  }
}