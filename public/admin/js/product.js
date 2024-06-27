console.log('Product .js');


// button-delete
const btnDelete = document.querySelectorAll('[button-delete]');
if (btnDelete.length > 0) {
  btnDelete.forEach(button => {
    button.addEventListener('click', () => {
      // form-delete-item
      const formDelete = document.querySelector('[form-delete-item]');
      const id = button.getAttribute('data-id');
      if (formDelete) {
        formDelete.action += `/${id}?_method=DELETE`;
        console.log(formDelete.action);
        formDelete.submit();
      }
    })
  })
}

// button-delete