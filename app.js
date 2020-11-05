let app = new Vue({
    el: '#app',
    data: {
        sitename: 'After school classes & activities',
        cart: [],
        lessons: lessons
    }, 
    methods: {
        addToCart(lesson) {
            if(lesson.availableSpaces > 0) {
                lesson.availableSpaces--;
                this.cart.push(lesson.id);
            } else {
                alert('No available spaces left');
            }
        },
        isAvailable(lesson) {
            return (lesson.availableSpaces <= 0) ? true : false;
        }
    },
    computed: {
        cartCount() {
            return this.cart.length;
        },
        hasItemInCart() {
            return (this.cartCount <= 0) ? false : true;
        }
    }
});