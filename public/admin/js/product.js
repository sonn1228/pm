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

// form-change-status
const btnChangeStatus = document.querySelectorAll('[button-change-status]');
if (btnChangeStatus.length > 0) {
  btnChangeStatus.forEach(button => {
    button.addEventListener('click', () => {
      const formChangeStatus = document.querySelector('[form-change-status]');
      if (formChangeStatus) {
        const id = button.getAttribute('data-id');
        const status = button.getAttribute('data-status');
        formChangeStatus.action += `/${status}/${id}?_method=patch`;
        formChangeStatus.submit();
      }
    })
  })
}

// end form-change-status