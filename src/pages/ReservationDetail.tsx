
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, Phone, User } from 'lucide-react';

// 임시 예약 상세 데이터
const mockReservationDetail = {
  id: 1,
  treatmentName: '스케일링',
  hospitalName: '24시 우리동물병원',
  hospitalAddress: '서울시 강남구 테헤란로 123',
  hospitalPhone: '02-1234-5678',
  date: '2024-06-25',
  time: '14:00',
  status: '예약완료',
  petName: '멍멍이',
  petWeight: '15kg',
  guardianName: '김철수',
  guardianPhone: '010-1234-5678',
  price: '80,000원',
  option: '일반검진',
  notes: '스케일링 전 8시간 금식 필요',
  reservationNumber: 'RES-20240625-001'
};

const ReservationDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const reservation = mockReservationDetail; // 실제로는 id로 데이터 조회

  return (
    <div className="min-h-screen max-w-md w-full mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button
          onClick={() => navigate('/status')}
          className="rounded-full hover:bg-gray-100 size-9 flex items-center justify-center"
        >
          <svg width="22" height="22" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-lg font-semibold ml-2">예약 상세</h1>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* 예약 상태 */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{reservation.treatmentName}</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                reservation.status === '예약완료'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {reservation.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">예약번호: {reservation.reservationNumber}</p>
          <p className="text-xl font-bold text-gray-900">{reservation.price}</p>
        </div>

        {/* 병원 정보 */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">병원 정보</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {reservation.hospitalName}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {reservation.hospitalAddress}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              {reservation.hospitalPhone}
            </div>
          </div>
        </div>

        {/* 예약 일시 */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">예약 일시</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              {reservation.date}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              {reservation.time}
            </div>
          </div>
        </div>

        {/* 반려동물 정보 */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">반려동물 정보</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-4 h-4 mr-2 text-center">🐾</span>
              이름: {reservation.petName}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-4 h-4 mr-2 text-center">⚖️</span>
              체중: {reservation.petWeight}
            </div>
          </div>
        </div>

        {/* 보호자 정보 */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">보호자 정보</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <User className="w-4 h-4 mr-2" />
              이름: {reservation.guardianName}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              연락처: {reservation.guardianPhone}
            </div>
          </div>
        </div>

        {/* 예약 옵션 */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">예약 옵션</h3>
          <p className="text-sm text-gray-600">{reservation.option}</p>
        </div>

        {/* 주의사항 */}
        {reservation.notes && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">주의사항</h3>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-700">{reservation.notes}</p>
            </div>
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="space-y-2 pt-4">
          <button className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600">
            예약 취소
          </button>
          <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200">
            예약 변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail;
