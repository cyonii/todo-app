import { parser } from '../utils/utils';

export default function (project) {
  const rawHTML = `
    <div class="d-flex flex-column align-items-center">
      <p class="display-4 text-center mt-5 text-muted">No Tasks</p>
      <p class="alert-dark d-flex mx-auto mb-0 px-3 py-1 fw-bold font-sm text-muted">${project.name}</p>
    </div>
  `;

  return parser(rawHTML);
}
