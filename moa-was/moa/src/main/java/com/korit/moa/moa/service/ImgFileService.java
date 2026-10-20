package com.korit.moa.moa.service;

import com.korit.moa.moa.storage.SupabaseStorage;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Map;
import java.util.UUID;

@Service
public class ImgFileService {

    private final ObjectProvider<SupabaseStorage> supabaseStorage;

    public ImgFileService(ObjectProvider<SupabaseStorage> supabaseStorage) {
        this.supabaseStorage = supabaseStorage;
    }

    @Value("${root.path:./image/}")
    private String rootPath;

    private static final long MAX_IMAGE_SIZE = 10 * 1024 * 1024;
    private static final Map<String, String> ALLOWED_TYPES = Map.of(
            "image/jpeg", ".jpg",
            "image/png", ".png",
            "image/gif", ".gif"
    );

    public String convertImgFile(MultipartFile file, String subPath) {
        if (file.isEmpty() || file.getSize() > MAX_IMAGE_SIZE) {
            throw new IllegalArgumentException("Image must be between 1 byte and 10MB");
        }

        String contentType = file.getContentType();
        String extension = ALLOWED_TYPES.get(contentType);
        if (extension == null) {
            throw new IllegalArgumentException("Only JPEG, PNG, and GIF images are allowed");
        }

        String newImgName = UUID.randomUUID() + extension;
        SupabaseStorage remote = supabaseStorage.getIfAvailable();
        if (remote != null) {
            String objectPath = subPath + "/" + newImgName;
            try {
                remote.upload(objectPath, file.getBytes(), contentType);
            } catch (IOException e) {
                throw new RuntimeException("Failed to save file: " + e.getMessage(), e);
            }
            return objectPath;
        }

        Path directory = Paths.get(rootPath).toAbsolutePath().normalize().resolve(subPath).normalize();
        Path uploadPath = directory.resolve(newImgName).normalize();
        if (!uploadPath.startsWith(directory)) {
            throw new IllegalArgumentException("Invalid upload path");
        }

        try {
            Files.createDirectories(directory);
            Files.write(uploadPath, file.getBytes(), StandardOpenOption.CREATE_NEW);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file: " + e.getMessage(), e);
        }
        return Paths.get(subPath, newImgName).toString().replace(File.separatorChar, '/');
    }
}
