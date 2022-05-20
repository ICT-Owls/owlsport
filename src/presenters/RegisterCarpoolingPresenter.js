import RegisterCarpoolingView from '../views/RegisterCarpoolingView';
export default function RegisterCarpoolingPresenter({
    isDriver,
    registerCar,
    requiresCarpooling,
}) {
    return RegisterCarpoolingView({
        isDriver,
        submit: registerCar,
        requiresCarpooling,
    });
}
