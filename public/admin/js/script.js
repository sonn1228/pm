// Bộ lọc 
console.log('Hello admin');
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
  console.log(stringStatus);

  if (stringStatus) {
    const optionChecked = document.querySelector(`option[value=${stringStatus}]`);
    optionChecked.selected = true;
  }
}
// end Bộ lọc
