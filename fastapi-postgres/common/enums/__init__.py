from enum import Enum


class EnumBase(str, Enum):
    def __get__(self, instance, ownerclass=None):
        if instance is None:
            return self.value

    @classmethod
    def values(cls):
        return [_.value for _ in cls]


class ModelType(EnumBase):
    teacher = "teacher"
    student = "student"
    assignment = "assignment"


class DBOperator(EnumBase):
    eq = "eq"
    ne = "ne"
    lt = "lt"
    le = "le"
    gt = "gt"
    ge = "ge"
    like = "like"
    ilike = "ilike"
    in_ = "in_"
    not_in = "not_in"
    contains = "contains"
    is_ = "is_"
    is_not = "is_not"


class Grade(EnumBase):
    A = "A"
    B = "B"
    C = "C"
    D = "D"
    E = "E"
    F = "F"
    G = "G"
    H = "H"
    I_ = "I"
    J = "J"
    K = "K"
    L = "L"
