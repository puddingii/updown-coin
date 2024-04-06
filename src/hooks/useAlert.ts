import Swal from 'sweetalert2';
import FailImage from 'src/assets/fail-image.gif';

type TFireOptions = Partial<{
	timer: number;
	showConfirmButton: boolean;
}>;
export const useAlert = () => {
	const fireFail = (options?: TFireOptions) => {
		Swal.fire({
			title: '실패!',
			imageUrl: FailImage,
			imageWidth: 400,
			imageHeight: 400,
			imageAlt: 'Fail image',
			customClass: {
				image: 'swal-fail-image',
			},
			timer: 5000,
			showConfirmButton: false,
			...options,
		});
	};

	return {
		fireFail,
	};
};
