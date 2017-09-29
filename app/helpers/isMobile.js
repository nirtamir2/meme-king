export default () => {
    const isMobile = window.innerWidth <= 767
    console.log(isMobile)
    return window.innerWidth <= 767;
};