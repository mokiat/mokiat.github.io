$(() => {
    let scrollTimeout = setTimeout(() => {
        $('body').scrollTo('#about', 1000);
    }, 2000);

    $(window).scroll(() => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
            scrollTimeout = null;
        }
    });
});