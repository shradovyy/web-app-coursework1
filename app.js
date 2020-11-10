let app = new Vue({
    el: '#app',
    data: {
        sitename: 'After school classes & activities',
        cart: [],
        lessons: lessons,
        cartShown: false,
        filters: ['name', 'location', 'price'],
        orderBy: ['ascending', 'descending'],
        selectedFilter: 'name',
        selectedOrder: 'ascending',
        order: {
            name: {
                value: '',
                error: false,
                errorMessage: ''
            },
            phone: {
                value: '',
                error: false,
                errorMessage: ''
            }
        }
    }, 
    methods: {
        addToCart(lesson) {
            if(lesson.availability > 0) {
                lesson.availability--;
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
            return (lesson.availability <= 0) ? true : false;
        }, 
        removeFromCart(id, event) {
            console.log(id);
            if(event) {
                event.preventDefault();
            }

            this.cart[id].lesson.availability += this.cart[id].quantity;
            this.cart.splice(id, 1);

        },
        isSelectedFilter(filter) {
            return filter == this.selectedFilter ? true : false;
        },
        isSelectedOrder(order) {
            return order == this.selectedOrder ? true : false;
        },
        decreaseQuantity(item) {
            if(item.quantity > 1) {
                item.quantity--;
                item.lesson.availability++;
            }
        },
        increaseQuantity(item) {
            if(item.lesson.availability >= 1) {
                item.quantity++;
                item.lesson.availability--;
            }
        },
        checkout() {
            alert('The order has been submitted.');

            this.cart.forEach((item, index) => {
                this.removeFromCart(index);
            });

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
            let that = this;
            function compare(a, b) {
                if (a[that.selectedFilter] > b[that.selectedFilter]) {
                    return that.selectedOrder == 'ascending' ? 1 : -1;
                }
                if (a[that.selectedFilter] < b[that.selectedFilter]) {
                    return that.selectedOrder == 'ascending' ? -1 : 1;
                }
                return 0; 
            }
            return lessonsArray.sort(compare); 
        },
        isCartShown() { 
            return this.cartShown; 
        },
        isValidCheckout() {
            if(!this.order.name.error && !this.order.phone.error) {
                return true;
            } else {
                return false;
            }
        }, 
        isValidName() {
            let item = this.order.name;

            if(item.value.length <= 0) {
                item.error = true;
                item.errorMessage = 'required';
                return item.errorMessage;
            }

            let test = /^[a-zA-Z ]+$/.test(item.value);

            if(test) {
                item.error = false;
                item.errorMessage = '';
                return item.errorMessage;
            } 

            item.error = true;
            item.errorMessage = 'invalid format';
            return item.errorMessage;
            
        }, 
        isValidPhone() {

            let item = this.order.phone;

            if(item.value.length <= 0) {
                item.error = true;
                item.errorMessage = 'required';
                return item.errorMessage;
            }

            if(typeof item.value == 'number') {
                item.error = false;
                item.errorMessage = '';
                return item.errorMessage;
            }

            item.error = true;
            item.errorMessage = 'invalid format';
            return item.errorMessage;

        }
    }
});