// Bộ lọc 
const filterStatus = document.querySelector('[filter-status]');
if (filterStatus) {
  const statusSelect = document.querySelector('[select-status]');
  let url = new URL(window.location.href);
  statusSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value == 'all') {
      url.searchParams.delete('status');
    } else {
      url.searchParams.set('status', value);
    }
    window.location.href = url.href;
  });

  const stringStatus = url.searchParams.get('status');

  if (stringStatus) {
    const optionChecked = document.querySelector(`option[value=${stringStatus}]`);
    optionChecked.selected = true;
  }
}
// end Bộ lọc

// sort

const sort = document.querySelector('[sort]');
if (sort) {
  let url = new URL(window.location.href);
  const sortSelect = document.querySelector('[select-sort]');
  sortSelect.addEventListener('change', (e) => {
    const [sortKey, sortValue] = e.target.value.split('-');
    if (sortKey == 'position' && sortValue == 'desc') {
      url.searchParams.delete('sortKey');
      url.searchParams.delete('sortValue');
    }
    else {
      url.searchParams.set('sortKey', sortKey);
      url.searchParams.set('sortValue', sortValue);
    }
    window.location.href = url.href;

  })
  const stringSort = `${url.searchParams.get('sortKey')}-${url.searchParams.get('sortValue')}`;
  if (stringSort) {
    const optionChecked = sortSelect.querySelector(`option[value=${stringSort}]`);
    if (optionChecked) {
      optionChecked.selected = true;
    }
  }
}

// end sort

// button-change-status


// end button-change-status

// form-search
const formSearch = document.querySelector('[form-search]');
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = e.target.elements.keyword.value;
    if (value) {
      url.searchParams.set('keyword', value);
    }
    else {
      url.searchParams.delete('keyword');
    }
    window.location.href = url.href;

  })
}

// end form-search

// button-pagination

const btnPagination = document.querySelectorAll('[button-pagination]');
if (btnPagination.length > 0) {
  let url = new URL(window.location.href);
  btnPagination.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('button-pagination');
      url.searchParams.set('page', value);
      window.location.href = url.href;
    })
  })
}

// end button-pagination

// upload image

const uploadImage = document.querySelector('[upload-image]');
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector('[upload-image-input]');
  const uploadImageImg = uploadImage.querySelector('[upload-image-img]');
  uploadImageInput.addEventListener('change', () => {
    const [file] = uploadImageInput.files
    if (file) {
      uploadImageImg.src = URL.createObjectURL(file)
    }
  })
}
// end upload image


