package com.example.backend.controller;

import com.example.backend.model.Item;
import com.example.backend.repository.ItemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {

    private final ItemRepository repository;

    public ItemController(ItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Item> all() {
        return repository.findAll();
    }

    @PostMapping
    public Item create(@RequestBody Item item) {
        return repository.save(item);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> get(@PathVariable String id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> update(@PathVariable String id, @RequestBody Item update) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(update.getName());
                    existing.setDescription(update.getDescription());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
