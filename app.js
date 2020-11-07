let app = new Vue({
    el: '#app',
    data: {
        sitename: 'After school classes & activities',
        cart: [],
        lessons: lessons,
        cartHidden: true,
        filters: ['Name', 'Location', 'Availability', 'Price'],
        orderBy: ['Asc', 'Desc'],
        selectedFilter: 'Name',
        selectedOrder: 'Asc'
    }, 
    methods: {
        addToCart(lesson) {
            if(lesson.availableSpaces > 0) {
                lesson.availableSpaces--;



                let exists = false;
                this.cart.forEach(item => {
                    if(item.lesson == lesson) {
                        exists = true;
                        item.quantity++;
                    }
                });

                if(!exists) {
                    this.cart.push({
                        lesson: lesson,
                        quantity: 1
                    });
                }


            } 
        },
        isAvailable(lesson) {
            return (lesson.availableSpaces <= 0) ? true : false;
        }, 
        removeFromCart(id, event) {
            if(event) {
                event.preventDefault();
            }

            this.cart[id].lesson.availableSpaces += this.cart[id].quantity;
            this.cart.splice(id, 1);

        },
        isSelectedFilter(filter) {
            return filter == this.selectedFilter ? true : false;
        },
        isSelectedOrder(order) {
            return order == this.selectedOrder ? true : false;
        }
    },
    computed: {
        cartCount() {
            return this.cart.length;
        },
        hasItemInCart() {
            return (this.cartCount <= 0) ? false : true;
        },
        cartTotal() {
           let total = 0;
           this.cart.forEach(item => {
            total += item.lesson.price * item.quantity;
           });
           return total.toFixed(2);
        },
        sortedLessons() {
            let lessonsArray = this.lessons.slice(0); 
            function compare(a, b) {
                if (a.availableSpaces > b.availableSpaces) return 1;
                if (a.availableSpaces < b.availableSpaces) return -1;
                return 0; 
            }
            return lessonsArray.sort(compare); 
        }
    }
});