import React from 'react';
import IonicIcon from '../IonicIcon';

interface KpiCardProps {
  title: string;
  icon: string;
  metric: string;
  caption: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, icon, metric, caption }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
      <LocalIcon name={icon} size={36} color="#10b981" />
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{metric}</p>
      <p className="text-gray-600 dark:text-gray-400 mt-2">{caption}</p>
    </div>
  );
};

export default KpiCard; 