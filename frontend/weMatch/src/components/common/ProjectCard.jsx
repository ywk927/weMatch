import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '../ui/card'
import { Badge } from '../ui/badge';
import { User, Clock, Code2 } from 'lucide-react';

export default function ProjectCard({ 
  title, 
  description, 
  techStack = [], 
  isClosed = false, 
  createdBy 
}) {
  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-lg ${
        isClosed 
          ? 'bg-gray-100 border-gray-300 opacity-75' 
          : 'bg-white border-blue-200 border-2 hover:border-blue-300'
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className={`text-lg font-semibold ${
            isClosed ? 'text-gray-600' : 'text-gray-900'
          }`}>
            {title}
          </CardTitle>
          <Badge 
            variant={isClosed ? 'secondary' : 'default'}
            className={`${
              isClosed 
                ? 'bg-gray-300 text-gray-700' 
                : 'bg-blue-100 text-blue-800 border-blue-200'
            }`}
          >
            {isClosed ? (
              <>
                <Clock className="w-3 h-3 mr-1" />
                완료됨
              </>
            ) : (
              <>
                <Clock className="w-3 h-3 mr-1" />
                진행중
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 프로젝트 설명 */}
        <p className={`text-sm leading-relaxed ${
          isClosed ? 'text-gray-500' : 'text-gray-700'
        }`}>
          {description}
        </p>
        
        {/* 기술 스택 */}
        {techStack && techStack.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Code2 className={`w-4 h-4 ${
                isClosed ? 'text-gray-400' : 'text-blue-600'
              }`} />
              <span className={`text-xs font-medium ${
                isClosed ? 'text-gray-500' : 'text-gray-700'
              }`}>
                기술 스택
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {techStack.map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className={`text-xs ${
                    isClosed 
                      ? 'border-gray-300 text-gray-500 bg-gray-50' 
                      : 'border-blue-200 text-blue-700 bg-blue-50'
                  }`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* 생성자 정보 */}
        {createdBy && (
          <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
            <User className={`w-4 h-4 ${
              isClosed ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <span className={`text-sm ${
              isClosed ? 'text-gray-500' : 'text-gray-600'
            }`}>
              생성자: {createdBy}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}