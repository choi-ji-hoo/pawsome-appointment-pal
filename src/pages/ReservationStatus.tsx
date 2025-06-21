
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';

// 임시 예약 데이터
const mockReservations = [
  {
    id: 1,
    treatmentName: '스케일링',
    hospitalName: '24시 우리동물병원',
    date: '2024-06-25',
    time: '14:00',
    status: '예약완료',
    petName: '멍멍이',
    price: '80,000원'
  },
  {
    id: 2,
    treatmentName: '건강검진',
    hospitalName: '24시 우리동물병원',
    date: '2024-06-28',
    time: '10:30',
    status: '대기중',
    petName: '야옹이',
    price: '120,000원'
  }
];

const ReservationStatus = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            로그인이 필요합니다
          </h2>
          <p className="text-gray-600 mb-6">
            예약 현황을 보려면 먼저 로그인해주세요.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-md w-full mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button
          onClick={() => navigate('/')}
          className="rounded-full hover:bg-gray-100 size-9 flex items-center justify-center"
        >
          <svg width="22" height="22" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-lg font-semibold ml-2">예약 현황</h1>
        <button
          onClick={() => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            navigate('/login');
          }}
          className="ml-auto text-sm text-gray-600 hover:text-gray-900"
        >
          로그아웃
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {mockReservations.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">예약 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-gray-50 rounded-xl p-4 border"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {reservation.treatmentName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {reservation.hospitalName}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reservation.status === '예약완료'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {reservation.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {reservation.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {reservation.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 mr-2 text-center">🐾</span>
                    {reservation.petName}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t">
                  <span className="font-semibold text-gray-900">
                    {reservation.price}
                  </span>
                  <button 
                    onClick={() => navigate(`/reservation/${reservation.id}`)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    상세보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationStatus;
