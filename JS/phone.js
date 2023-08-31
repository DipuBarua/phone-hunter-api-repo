const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);

}

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);

  // sowh all btn when card length more than 12
  const showAllContainer = document.getElementById('showAll-container')
  if (phones.length > 12 && !isShowAll) {
    // console.log(phones.length);
    showAllContainer.classList.remove('hidden');
  }
  else {
    showAllContainer.classList.add('hidden');
  }

  // display (limited) first 12 phone cards if not clicked to show all btn
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  // step1 >> get the mother container.
  const phoneContainer = document.getElementById('phone-container');
  // clear phone card container before adding new phone
  phoneContainer.textContent = '';

  phones.forEach(phone => {
    // console.log(phone);
    // step2 >> create a child div(can add class).
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card w-96 bg-gray-100`;
    // step3 >> set inner html in the child.
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="phone" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.brand}</h2>
          <p>${phone.phone_name}</p>
          <div class="card-actions justify-center">
            <button onClick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
    // step4 >> appene the child to mother container.
    phoneContainer.appendChild(phoneCard);
  })
  // hide loading spinner 
  toggleLoadingSpin(false);
}

// handle show details btn 
const handleShowDetails = async (id) => {
  // console.log('show id:',id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
  // console.log(data);
}
// show phone details
const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-details-phone-name');
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML = ` 
  <div class="flex justify-center"><img src="${phone.image}" alt="phone"></div>
  <p> <span><b>Storage:</b></span> ${phone.mainFeatures.storage}
  <p> <span><b>Display size:</b></span> ${phone.mainFeatures.displaySize}
  <p> <span><b>Chip Set:</b></span> ${phone.mainFeatures.chipSet}
  <p> <span><b>Memory:</b></span> ${phone.mainFeatures.memory}
  <p> <span><b>Slug:</b></span> ${phone.slug}
  <p> <span><b>Brand:</b></span> ${phone.brand}
  <p> <span><b>ReleaseDate:</b></span> ${phone.releaseDate}
  <p> <span><b>GPS:</b></span> ${phone.others?.GPS || 'No GPS available'}
  `
  show_details_modal.showModal()
}

// handle search btn
const handleSearch = (isShowAll) => {
  // console.log('search here');
  toggleLoadingSpin(true);//call loading-spinner
  const inputField = document.getElementById('input-field');
  const searchText = inputField.value;
  loadPhone(searchText, isShowAll);
}

// another handle search btn >> recap
// const handleSearch2 = () => {
//   toggleLoadingSpin(true);//call loading-spinner
//   const searchField = document.getElementById('search-field');
//   const searchText = searchField.value;
//   loadPhone(searchText);
// }

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

// handle show all 
const handleShowAll = () => {
  handleSearch(true);
}

