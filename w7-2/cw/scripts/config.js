const SexEnum = {
    MALE    : "M",
    FEMALE  : "F",

    isValid(sex) {
        return sex == this.MALE ||
               sex == this.FEMALE;
    }
};

const StatusEnum = {
    NORMAL  : "NORMAL",
    VIP     : "VIP"
};