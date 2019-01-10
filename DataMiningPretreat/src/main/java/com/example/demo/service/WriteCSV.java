package com.example.demo.service;

import com.example.demo.GetData.getData;
import com.csvreader.CsvWriter;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service
public class WriteCSV {

    private String filePath = "G:/DataMining/DataMining.csv";

    public String getFilePath() {
        return filePath;
    }

    public void write(List<String[]> content){

        try {
            // 创建CSV写对象
            CsvWriter csvWriter = new CsvWriter(filePath,',', Charset.forName("gbk"));
            //CsvWriter csvWriter = new CsvWriter(filePath);

            // 写表头
            String[] headers = {"身高","体重","体重指数(18.5-23.9)","糖化血红蛋白","血清间接胆红素","血清球蛋白","血清碱性磷酸酶","血清r-谷氨酰转肽酶","血清谷丙转氨酶","血清谷草转氨酶","血清总蛋白","血清白/球比值","血清总胆红素","血清直接胆红素","血清白蛋白","AST/ALT比值","血清低密度脂蛋白","血清高密度脂蛋白","血清甘油三酯","血清总胆固醇","血清尿素","血清肌酐","血清尿酸"};
            csvWriter.writeRecord(headers);
            for(String[] s : content){
                csvWriter.writeRecord(s);
            }

            csvWriter.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

//    public boolean generateWorkbook(String path, List<String> titles, List<Map<String, Object>> values) {
//        Workbook workbook=new XSSFWorkbook();
//        // 生成一个表格
//        Sheet sheet=workbook.createSheet();
//        // 设置表格默认列宽度为15个字节
//        sheet.setDefaultColumnWidth((short) 15);
//        /*
//         * 创建标题行
//         */
//        Row row = sheet.createRow(0);
//        for (int i = 0; i < titles.size(); i++) {
//            Cell cell = row.createCell(i);
//            cell.setCellValue(titles.get(i));
//        }
//        /*
//         * 写入正文
//         */
//        Iterator<Map<String, Object>> iterator = values.iterator();
//        int index = 0;
//        while (iterator.hasNext()) {
//            index++;
//            row = sheet.createRow(index);
//            Map<String, Object> value = iterator.next();
//            String content = "";
//            for (Map.Entry<String, Object> map : value.entrySet()) {
//                Object object = map.getValue();
//                content = object.toString();
//            }
//            for (int i = 0; i < value.size(); i++) {
//                Cell cell = row.createCell(i);
//                cell.setCellValue(content);
//            }
//        }
//        /*
//         * 写入到文件中
//         */
//        boolean isCorrect = false;
//        File file = new File(path);
//        // 如果文件存在,则删除已有的文件,重新创建一份新的
//        if (file.exists()) {
//            file.deleteOnExit();
//            file = new File(path);
//        }
//        OutputStream outputStream = null;
//        try {
//            outputStream = new FileOutputStream(file);
//            workbook.write(outputStream);
//            isCorrect = true;
//        } catch (IOException e) {
//            e.printStackTrace();
//        } finally {
//            try {
//                if (null != outputStream) {
//                    outputStream.close();
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//        return isCorrect;
//    }
}
