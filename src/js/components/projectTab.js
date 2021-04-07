import { setAttributes } from '../utils/utils';

export default function (project) {
  const navBtn = document.createElement('button');

  navBtn.classList.add('nav-link', 'lead', 'text-primay', 'text-start');
  navBtn.innerText = project.name;
  setAttributes(navBtn, { id: project.id, 'data-bs-toggle': 'pill' });

  return navBtn;
}
