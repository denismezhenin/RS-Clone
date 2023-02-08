import toastr from 'toastr';

const popUpMessages = (typeMessage: ToastrType, message: string) => {
  toastr[typeMessage](message);

  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: 'toast-top-full-width',
    preventDuplicates: false,

    showDuration: 300,
    hideDuration: 1000,
    timeOut: 5000,
    extendedTimeOut: 1000,
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
  };
};
export default popUpMessages;
