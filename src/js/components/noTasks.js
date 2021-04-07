export default function (project) {
  const wrapper = document.createElement('div');
  const message = document.createElement('p');
  const subText = document.createElement('p');

  message.textContent = 'No Tasks';
  message.classList.add('display-4', 'text-center', 'mt-5', 'text-muted');
  subText.textContent = `${project.name}`;
  subText.classList.add(
    'alert-dark',
    'd-flex',
    'mx-auto',
    'mb-0',
    'px-3',
    'py-1',
    'fw-bold',
    'font-sm',
    'text-muted',
  );
  wrapper.classList.add('d-flex', 'flex-column', 'align-items-center');
  wrapper.appendChild(message);
  wrapper.appendChild(subText);

  return wrapper;
}
