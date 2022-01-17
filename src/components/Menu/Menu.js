export class Menu {
  constructor(page = '') {
    this.page = page;
  }

  render() {
    return `
      <nav class="category__menu">
        <a class="category__menu-item" href="#/">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
            d="M12.3083 2.95373C12.7817 2.55475 13.3809 2.33594 14 2.33594C14.6191 2.33594 15.2183 2.55475 15.6917 2.95373L23.5667 9.59439C24.1582 10.0937 24.5 10.8276 24.5 11.6011V23.0379C24.5 23.5794 24.2849 24.0987 23.902 24.4816C23.5191 24.8645 22.9998 25.0796 22.4583 25.0796H18.375C17.8335 25.0796 17.3142 24.8645 16.9313 24.4816C16.5484 24.0987 16.3333 23.5794 16.3333 23.0379V16.6212C16.3333 16.5439 16.3026 16.4697 16.2479 16.415C16.1932 16.3603 16.119 16.3296 16.0417 16.3296H11.9583C11.881 16.3296 11.8068 16.3603 11.7521 16.415C11.6974 16.4697 11.6667 16.5439 11.6667 16.6212V23.0379C11.6667 23.5794 11.4516 24.0987 11.0687 24.4816C10.6858 24.8645 10.1665 25.0796 9.625 25.0796H5.54167C5.27355 25.0796 5.00806 25.0267 4.76035 24.9241C4.51265 24.8215 4.28758 24.6712 4.09799 24.4816C3.9084 24.292 3.75802 24.0669 3.65541 23.8192C3.55281 23.5715 3.5 23.306 3.5 23.0379V11.6011C3.5 10.8276 3.84183 10.0937 4.43333 9.59439L12.3083 2.95373ZM14.5635 4.29189C14.4058 4.15911 14.2062 4.08629 14 4.08629C13.7938 4.08629 13.5942 4.15911 13.4365 4.29189L5.5615 10.9314C5.46405 11.0134 5.38568 11.1158 5.33188 11.2312C5.27807 11.3467 5.25013 11.4725 5.25 11.5999V23.0367C5.25 23.1977 5.38067 23.3284 5.54167 23.3284H9.625C9.70235 23.3284 9.77654 23.2977 9.83124 23.243C9.88594 23.1883 9.91667 23.1141 9.91667 23.0367V16.6201C9.91667 15.4919 10.8313 14.5784 11.9583 14.5784H16.0417C17.1687 14.5784 18.0833 15.4919 18.0833 16.6201V23.0367C18.0833 23.1977 18.214 23.3284 18.375 23.3284H22.4583C22.5357 23.3284 22.6099 23.2977 22.6646 23.243C22.7193 23.1883 22.75 23.1141 22.75 23.0367V11.6011C22.7499 11.4737 22.7219 11.3479 22.6681 11.2324C22.6143 11.1169 22.536 11.0146 22.4385 10.9326L14.5635 4.29189Z" />
          </svg>
          <span>Главная</span>
        </a>
        <a class="category__menu-item menu_category" href="#/categories">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
            d="M11.6667 12.0833H4.66667C4.55616 12.0833 4.45018 12.0394 4.37204 11.9613C4.2939 11.8832 4.25 11.7772 4.25 11.6667V4.66667C4.25 4.55616 4.2939 4.45018 4.37204 4.37204C4.45018 4.2939 4.55616 4.25 4.66667 4.25H11.6667C11.7772 4.25 11.8832 4.2939 11.9613 4.37204C12.0394 4.45018 12.0833 4.55616 12.0833 4.66667V11.6667C12.0833 11.7772 12.0394 11.8832 11.9613 11.9613C11.8832 12.0394 11.7772 12.0833 11.6667 12.0833ZM23.3333 12.0833H16.3333C16.2228 12.0833 16.1168 12.0394 16.0387 11.9613C15.9606 11.8832 15.9167 11.7772 15.9167 11.6667V4.66667C15.9167 4.55616 15.9606 4.45018 16.0387 4.37204C16.1168 4.2939 16.2228 4.25 16.3333 4.25H23.3333C23.4438 4.25 23.5498 4.2939 23.628 4.37204C23.7061 4.45018 23.75 4.55616 23.75 4.66667V11.6667C23.75 11.7772 23.7061 11.8832 23.628 11.9613C23.5498 12.0394 23.4438 12.0833 23.3333 12.0833ZM11.6667 23.75H4.66667C4.55616 23.75 4.45018 23.7061 4.37204 23.628C4.2939 23.5498 4.25 23.4438 4.25 23.3333V16.3333C4.25 16.2228 4.2939 16.1168 4.37204 16.0387C4.45018 15.9606 4.55616 15.9167 4.66667 15.9167H11.6667C11.7772 15.9167 11.8832 15.9606 11.9613 16.0387C12.0394 16.1168 12.0833 16.2228 12.0833 16.3333V23.3333C12.0833 23.4438 12.0394 23.5498 11.9613 23.628C11.8832 23.7061 11.7772 23.75 11.6667 23.75ZM23.75 19.8333C23.75 21.9928 21.9928 23.75 19.8333 23.75C17.6739 23.75 15.9167 21.9928 15.9167 19.8333C15.9167 17.6739 17.6739 15.9167 19.8333 15.9167C21.9928 15.9167 23.75 17.6739 23.75 19.8333Z" />
          </svg>
          <span>Категории</span>
        </a>
        <a class="category__menu-item menu_score" href="#/score">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
            d="M24.9077 11.2609C24.8025 10.9208 24.6091 10.6176 24.3488 10.3849C24.0885 10.1523 23.7716 9.99921 23.433 9.94272L18.1205 9.04277L15.6578 4.05433C15.5009 3.73676 15.2632 3.47036 14.9706 3.28438C14.6781 3.09839 14.342 3 13.9993 3C13.6567 3 13.3206 3.09839 13.028 3.28438C12.7355 3.47036 12.4977 3.73676 12.3409 4.05433L9.87814 9.04277L4.56574 9.94272C4.22752 10.0001 3.911 10.1535 3.65091 10.386C3.39082 10.6186 3.1972 10.9213 3.09131 11.261C2.98541 11.6007 2.97133 11.9643 3.05061 12.3118C3.12989 12.6593 3.29946 12.9773 3.54073 13.231L7.33114 17.2139L6.51072 22.7585C6.45808 23.1117 6.49989 23.4731 6.63156 23.8031C6.76323 24.1331 6.97966 24.4188 7.25704 24.6289C7.53441 24.839 7.862 24.9652 8.20376 24.9938C8.54553 25.0223 8.88823 24.9521 9.19417 24.7908L13.9993 22.2639L18.8046 24.7908C19.1106 24.9518 19.4532 25.0218 19.7949 24.9931C20.1365 24.9643 20.4639 24.8381 20.7412 24.6281C21.0185 24.4181 21.2349 24.1325 21.3666 23.8027C21.4984 23.4729 21.5404 23.1116 21.4881 22.7585L20.6677 17.2139L24.4581 13.231C24.7001 12.9778 24.8702 12.6598 24.9496 12.3121C25.0289 11.9644 25.0144 11.6006 24.9077 11.2609ZM23.4167 12.1543L19.1052 16.6849L20.0385 22.9917C20.0501 23.0672 20.0414 23.1446 20.0133 23.2153C19.9853 23.286 19.939 23.3472 19.8797 23.3922C19.8203 23.4371 19.7502 23.4641 19.677 23.47C19.6038 23.476 19.5305 23.4607 19.4652 23.4259L13.9993 20.5516L8.53344 23.426C8.4681 23.4608 8.39479 23.4761 8.32164 23.4701C8.24848 23.4642 8.17833 23.4372 8.11897 23.3923C8.0596 23.3473 8.01334 23.2861 7.9853 23.2154C7.95726 23.1447 7.94854 23.0673 7.96011 22.9918L8.89351 16.6849L4.58201 12.1543C4.53053 12.1001 4.49435 12.0321 4.47744 11.9579C4.46054 11.8837 4.46356 11.806 4.48618 11.7335C4.50879 11.6609 4.55013 11.5962 4.60566 11.5465C4.66119 11.4968 4.72878 11.464 4.801 11.4517L10.8437 10.4281L13.645 4.75391C13.6785 4.68604 13.7293 4.6291 13.7918 4.58934C13.8543 4.54959 13.9261 4.52856 13.9993 4.52856C14.0726 4.52856 14.1444 4.54959 14.2069 4.58934C14.2694 4.6291 14.3202 4.68604 14.3537 4.75391L17.155 10.4281L23.1977 11.4517C23.2699 11.464 23.3375 11.4968 23.393 11.5465C23.4485 11.5962 23.4899 11.6609 23.5125 11.7335C23.5351 11.806 23.5381 11.8837 23.5212 11.9579C23.5043 12.0321 23.4682 12.1001 23.4167 12.1543L23.4167 12.1543Z" />
          </svg>
          <span>Результат</span>
        </a>
      </nav>
    `;
  }

  after_render() {}
}
