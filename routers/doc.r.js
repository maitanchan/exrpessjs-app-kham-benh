const app = require('express');
const router = app.Router();
const docC = require('../controllers/doc.c');
router.get('/xuat-hoa-don', docC.createInvoice);
router.post('/xuat-hoa-don', docC.UpdateInvoice);
router.get('/lap-phieu-hen', docC.getAppointment);
router.post('/lap-phieu-hen', docC.postAppointment);
router.post('/them-benh-ly', docC.postSick);
router.post('/trang-thai-phieu-hen', docC.changeStatus);
router.post('/ghi-chu-phieu-hen', docC.changeNote);
router.get('/danh-sach-kham-benh', docC.getPatientsListInDay);
router.post('/danh-sach-kham-benh', docC.postPatientsListInDay);
router.get('/bao-cao-doanh-thu/:ID', docC.viewRevenueDetail);
router.get('/bao-cao-doanh-thu', docC.getRevenue);
router.post('/bao-cao-doanh-thu', docC.postRevenue);
router.get('/xem-bao-cao-doanh-thu', docC.viewAllRevenue);
router.get('/bao-cao-thuoc/:ID', docC.viewDrugReportDetail);
router.get('/bao-cao-thuoc', docC.getDrugReport);
router.post('/bao-cao-thuoc', docC.postDrugReport);
router.get('/xem-bao-cao-thuoc', docC.viewAllDrugReports);
router.get('/ho-so-benh-an/:ID', docC.viewRecordDetail);
module.exports = router;